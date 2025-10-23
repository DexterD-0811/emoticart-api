export const getCategoriesByProductCount = async (req, res) => {
  try {
    // Example: ?min=0&max=10
    const minCount = parseInt(req.query.min) || 0;
    const maxCount = parseInt(req.query.max) || 1000;

    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products',
        },
      },
      {
        $addFields: {
          productCount: { $size: '$products' },
        },
      },
      {
        $match: {
          productCount: { $gte: minCount, $lte: maxCount },
        },
      },
      {
        $project: {
          products: 0,
        },
      },
    ]);

    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};
