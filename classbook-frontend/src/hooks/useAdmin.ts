import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';
import type { Booking, AuditLog } from '../types';

export const useAllBookings = () => {
  return useQuery({
    queryKey: ['admin-bookings'],
    queryFn: () => api.get<Booking[]>('/admin/bookings').then(res => res.data)
  });
};

export const useAuditLogs = () => {
  return useQuery({
    queryKey: ['audit-logs'],
    queryFn: () => api.get<AuditLog[]>('/admin/audit-logs').then(res => res.data)
  });
};