import { Router } from 'express';
import {
  getAdminWorkers,
  getAdminWorkerById,
  updateAdminWorker,
  toggleAdminBan,
  deleteAdminWorker,
} from '@controllers/admin.controller';

const router = Router();

// Get all admin workers
router.get('/', getAdminWorkers);

// Get specific admin worker
router.get('/:id', getAdminWorkerById);

// Update admin worker
router.put('/:id', updateAdminWorker);

// Ban/Unban admin worker
router.put('/:id/ban', toggleAdminBan);

// Delete admin worker
router.delete('/:id', deleteAdminWorker);

export default router; 