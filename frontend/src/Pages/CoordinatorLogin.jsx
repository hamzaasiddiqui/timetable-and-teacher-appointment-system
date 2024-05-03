export default function CoordinatorLogin() {
    return (
      <>
        <h1 className="mb-5">Coordinator Login</h1>
        <form>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
        <div className="d-flex mt-5">
          <a type="button" href="/" className="btn btn-info">Student Login</a>
          <a type="button" href="/dean_login" className="btn btn-info mx-2">Dean Login</a>
          <a type="button" href="/faculty_login" className="btn btn-info">Faculty Login</a>
        </div>
      </>
    )
  }
  