import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  Heart,
  LockKeyhole,
  Mail,
  UserRound,
} from 'lucide-react'

const roles = {
  fan: {
    title: 'Create your fan account',
    subtitle: 'Join the community and help shape what comes next.',
    button: 'Create fan account',
  },
  business: {
    title: 'Create your business account',
    subtitle: 'Bring your brand or event to the KIZUNA community.',
    button: 'Create business account',
  },
}

export default function Register() {
  const { role } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  if (!roles[role]) {
    return (
      <main className="auth-shell">
        <header className="auth-topbar">
          <Link className="kizuna-brand" to="/login">
            <span className="brand-mark">
              <Heart size={19} />
            </span>
            KIZUNA<span className="brand-period">.</span>
          </Link>
        </header>
        <p className="form-message">Choose a portal first.</p>
        <Link to="/login">Back to portal selection</Link>
      </main>
    )
  }

  const config = roles[role]

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Use a password with at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Your passwords do not match.')
      return
    }

    // Demo only: real account creation requires a backend.
    navigate(`/login/${role}`, {
      state: { registered: true },
    })
  }

  return (
    <main className="auth-shell form-shell">
      <header className="auth-topbar">
        <Link className="kizuna-brand" to="/login">
          <span className="brand-mark">
            <Heart size={19} />
          </span>
          <span>
            KIZUNA<span className="brand-period">.</span>
          </span>
        </Link>

        <Link className="back-link" to="/login">
          <ArrowLeft size={16} /> Change portal
        </Link>
      </header>

      <section className="register-wrap">
        <div className="form-heading">
          <span className="form-icon">
            {role === 'fan' ? (
              <UserRound size={22} />
            ) : (
              <Building2 size={22} />
            )}
          </span>

          <span className="register-eyebrow">
            {role === 'fan' ? 'FAN PORTAL' : 'BUSINESS PORTAL'}
          </span>

          <h2>{config.title}</h2>
          <p>{config.subtitle}</p>
        </div>

        <form className="auth-form register-form" onSubmit={handleSubmit}>
          <label htmlFor="register-name">Full name</label>
          <div className="input-wrap">
            <UserRound size={18} />
            <input
              id="register-name"
              autoComplete="name"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          {role === 'business' && (
            <>
              <label htmlFor="register-organization">
                Company or organization name
              </label>
              <div className="input-wrap">
                <Building2 size={18} />
                <input
                  id="register-organization"
                  autoComplete="organization"
                  placeholder="Your company or event team"
                  value={organization}
                  onChange={(event) => setOrganization(event.target.value)}
                  required
                />
              </div>
            </>
          )}

          <label htmlFor="register-email">Email address</label>
          <div className="input-wrap">
            <Mail size={18} />
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <label htmlFor="register-password">Password</label>
          <div className="input-wrap">
            <LockKeyhole size={18} />
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
            />
            <button
              className="icon-button"
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <label htmlFor="register-confirm">Confirm password</label>
          <div className="input-wrap">
            <LockKeyhole size={18} />
            <input
              id="register-confirm"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>

          {error && (
            <p className="form-message" role="alert">
              {error}
            </p>
          )}

          <button className="submit-button" type="submit">
            {config.button} <ArrowRight size={17} />
          </button>
        </form>

        <p className="form-switch">
          Already have an account?{' '}
          <Link to={`/login/${role}`}>Sign in</Link>
        </p>

        <p className="form-privacy">
          Demo mode: account creation requires a connected authentication
          backend.
        </p>
      </section>

      <footer className="auth-footer">
        <span>© 2026 KIZUNA</span>
        <span>Made for the things that bring us together.</span>
        <Link to="/login">Change portal</Link>
      </footer>
    </main>
  )
}