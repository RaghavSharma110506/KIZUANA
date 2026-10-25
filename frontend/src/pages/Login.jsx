import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Heart,
  LockKeyhole,
  Mail,
  Sparkles,
  Users,
} from 'lucide-react'

const portalInfo = {
  fan: {
    title: 'Your fandom, your world.',
    subtitle:
      'Discover products, shape what launches next, and find your people.',
    label: 'Fan Portal',
  },
  business: {
    title: 'Turn your audience into insight.',
    subtitle:
      'Validate demand, manage campaigns, and create events fans care about.',
    label: 'Business Portal',
  },
}

function Brand() {
  return (
    <Link className="kizuna-brand" to="/login" aria-label="KIZUNA home">
      <span className="brand-mark">
        <Heart size={19} strokeWidth={2.5} />
      </span>
      <span>
        KIZUNA<span className="brand-period">.</span>
      </span>
    </Link>
  )
}

function PortalChooser() {
  return (
    <main className="auth-shell">
      <header className="auth-topbar">
        <Brand />
        <span className="topbar-note">
          A universe built around what you love
        </span>
      </header>

      <section className="chooser-content">
        <div className="eyebrow">
          <Sparkles size={15} /> WELCOME TO KIZUNA
        </div>

        <h1>
          Find your place
          <br className="desktop-break" /> in the{' '}
          <span className="gradient-text">community.</span>
        </h1>

        <p className="chooser-intro">
          One community, two ways to make an impact. Choose how you want to
          experience KIZUNA.
        </p>

        <div className="portal-grid">
          <Link to="/login/fan" className="portal-card fan-card">
            <div className="portal-art fan-art" aria-hidden="true">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-core">
                <Users size={39} />
              </div>
              <span className="art-spark spark-a">✦</span>
              <span className="art-spark spark-b">✧</span>
            </div>

            <div className="portal-card-body">
              <span className="portal-kicker">FOR FANS & COLLECTORS</span>
              <h2>I'm here for the fandom</h2>
              <p>
                Explore drops, vote on ideas, discover events, and earn rewards
                with your community.
              </p>
              <span className="portal-cta">
                Enter Fan Portal <ArrowRight size={17} />
              </span>
            </div>
          </Link>

          <Link to="/login/business" className="portal-card business-card">
            <div className="portal-art business-art" aria-hidden="true">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-core">
                <Building2 size={39} />
              </div>
              <span className="art-spark spark-a">✦</span>
              <span className="art-spark spark-b">✧</span>
            </div>

            <div className="portal-card-body">
              <span className="portal-kicker">
                FOR COMPANIES & ORGANIZERS
              </span>
              <h2>I'm building an experience</h2>
              <p>
                Understand your audience, validate product demand, and manage
                campaigns and events.
              </p>
              <span className="portal-cta">
                Enter Business Portal <ArrowRight size={17} />
              </span>
            </div>
          </Link>
        </div>

        <p className="chooser-footnote">
          New to KIZUNA? Choose your portal to create an account.
        </p>
      </section>

      <footer className="auth-footer">
        <span>© 2026 KIZUNA</span>
        <span>Made for the things that bring us together.</span>
        <a href="mailto:support@kizuna.example">Help & support</a>
      </footer>
    </main>
  )
}

function LoginForm({ role }) {
  const info = portalInfo[role]
  const location = useLocation()

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.')
      return
    }

    setSuccess(
      'The login interface is ready. Connect an authentication backend to verify your credentials.',
    )
  }

  return (
    <main className="auth-shell form-shell">
      <header className="auth-topbar">
        <Brand />
        <Link className="back-link" to="/login">
          <ArrowLeft size={16} /> Change portal
        </Link>
      </header>

      <div className="form-layout">
        <section
          className={`form-aside ${
            role === 'business' ? 'form-aside-business' : ''
          }`}
        >
          <div className="aside-orb aside-orb-one" />
          <div className="aside-orb aside-orb-two" />

          <div className="aside-copy">
            <span className="aside-label">
              <Sparkles size={14} /> {info.label.toUpperCase()}
            </span>
            <h1>{info.title}</h1>
            <p>{info.subtitle}</p>
          </div>

          <div className="aside-bottom">
            <CheckCircle2 size={17} />
            <span>
              {role === 'fan'
                ? 'Your next favourite thing starts here.'
                : 'Better decisions start with your community.'}
            </span>
          </div>
        </section>

        <section className="form-panel">
          <div className="form-heading">
            <span className="form-icon">
              {role === 'fan' ? (
                <Users size={22} />
              ) : (
                <Building2 size={22} />
              )}
            </span>
            <h2>Welcome back</h2>
            <p>
              Sign in to continue to your{' '}
              {role === 'fan' ? 'fan' : 'business'} space.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email address</label>
            <div className="input-wrap">
              <Mail size={18} />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="label-row">
              <label htmlFor="login-password">Password</label>
              <button
                className="text-button"
                type="button"
                onClick={() =>
                  setError(
                    'Password reset requires a connected authentication service.',
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            <div className="input-wrap">
              <LockKeyhole size={18} />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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

            {location.state?.registered && (
              <p className="form-success" role="status">
                Registration form completed in demo mode. A backend is needed
                to create a real account.
              </p>
            )}

            {error && (
              <p className="form-message" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="form-success" role="status">
                {success}
              </p>
            )}

            <button className="submit-button" type="submit">
              Sign in <ArrowRight size={17} />
            </button>
          </form>

          <p className="form-switch">
            Don't have an account?{' '}
            <Link to={`/register/${role}`}>Create one</Link>
          </p>

          <p className="form-privacy">
            By continuing, you agree to KIZUNA's Terms of Service and Privacy
            Policy.
          </p>
        </section>
      </div>

      <footer className="auth-footer">
        <span>© 2026 KIZUNA</span>
        <span>Made for the things that bring us together.</span>
        <Link to="/login">Change portal</Link>
      </footer>
    </main>
  )
}

export default function Login() {
  const { role } = useParams()

  if (!role) return <PortalChooser />
  if (!portalInfo[role]) return <PortalChooser />

  return <LoginForm role={role} />
}