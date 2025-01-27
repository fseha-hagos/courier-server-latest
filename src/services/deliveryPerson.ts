import { UserStatus } from '@prisma/client';
import { db } from '@utils/db';  // Assuming you have a Prisma client file

export const updateDeliveryPersonStatus = async (userId: string, status: UserStatus) => {
  try {
    const updatedPerson = await db.users.update({
      where: { id: userId },
      data: { status },
    });
    return updatedPerson;
  } catch (error) {
    throw new Error('Error updating delivery person status');
  }
};

export const getDeliveryPersons = async () => {
  try {
    const deliveryPersons = await db.users.findMany({
      where: {
        role: 'DELIVERY_PERSON',
      },
    });
    return deliveryPersons;
  } catch (error) {
    throw new Error('Error fetching delivery persons');
  }
};
