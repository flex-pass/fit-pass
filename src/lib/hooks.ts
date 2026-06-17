import { useState, useEffect } from 'react';
import { gymService, checkinService, creditsService, adminService, CheckIn, Gym } from './api';

export function useGyms(lat: number, lng: number, radius: number = 10000) {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchGyms = async () => {
      try {
        setLoading(true);
        const res = await gymService.getNearby(lat, lng, radius);
        if (isMounted && res.success) {
          setGyms(res.data);
        }
      } catch (err: any) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchGyms();
    return () => { isMounted = false; };
  }, [lat, lng, radius]);

  return { gyms, loading, error };
}

export function useGym(id: string) {
  const [gym, setGym] = useState<Gym | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchGym = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await gymService.getById(id);
        if (isMounted && res.success) {
          setGym(res.data);
        }
      } catch (err: any) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchGym();
    return () => { isMounted = false; };
  }, [id]);

  return { gym, loading, error };
}

export function useCheckins() {
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCheckins = async () => {
    try {
      setLoading(true);
      const res = await checkinService.getHistory();
      if (res.success) {
        setCheckins(res.data);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckins();
  }, []);

  return { checkins, loading, error, refetch: fetchCheckins };
}

export function useCredits() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCredits = async () => {
    try {
      setLoading(true);
      const [balRes, histRes] = await Promise.all([
        creditsService.getBalance(),
        creditsService.getHistory()
      ]);
      if (balRes.success) setBalance(balRes.data.creditsBalance);
      if (histRes.success) setHistory(histRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return { balance, history, loading, refetch: fetchCredits };
}

export function useAdminOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await adminService.getDashboard();
        if (res.success) setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, loading };
}

export function usePendingGyms() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGyms = async () => {
    try {
      setLoading(true);
      const res = await adminService.getPendingGyms();
      if (res.success) setGyms(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGyms();
  }, []);

  return { gyms, loading, refetch: fetchGyms };
}

export function useFraudLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await adminService.getFraudLogs();
        if (res.success) setLogs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return { logs, loading };
}

