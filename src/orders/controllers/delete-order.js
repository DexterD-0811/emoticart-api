import { Order } from '../model.js';

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({
      message: 'Order deleted successfully',
      order: deletedOrder,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting order', error: error.message });
  }
};
