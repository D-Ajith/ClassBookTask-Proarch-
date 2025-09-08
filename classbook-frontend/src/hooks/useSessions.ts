import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';
import type { Session, Booking } from '../types';

export const useSessions = () => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: () => api.get<Session[]>('/sessions').then(res => res.data)
  });
};

export const useBookSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) =>
      api.post<Booking>('/bookings', { sessionId }).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: string) => api.delete(`/bookings/${bookingId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useUserBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => api.get<Booking[]>('/bookings/my-bookings').then(res => res.data)
  });
};