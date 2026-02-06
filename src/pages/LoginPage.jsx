import { useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import '../App.css';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const redirectTo = useMemo(() => {
    const from = location.state?.from;
    if (!from) return '/';
    const pathname = typeof from.pathname === 'string' ? from.pathname : '/';
    const search = typeof from.search === 'string' ? from.search : '';
    const hash = typeof from.hash === 'string' ? from.hash : '';
    return `${pathname}${search}${hash}`;
  }, [location.state]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const ok = login(username);
    if (!ok) {
      setError('请输入用户名');
      return;
    }
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="container">
      <header>
        <h1>🔐 登录</h1>
        <div className="stats">
          <span>登录后进入待办清单</span>
        </div>
      </header>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-field">
          <label className="login-label" htmlFor="login-username">用户名</label>
          <input
            id="login-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            placeholder="请输入用户名"
          />
        </div>

        <div className="login-field">
          <label className="login-label" htmlFor="login-password">密码</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="可留空（演示用）"
          />
        </div>

        {error && <div className="login-error" role="alert">{error}</div>}

        <div className="login-actions">
          <button className="login-btn" type="submit">进入</button>
        </div>
      </form>
    </div>
  );
}

