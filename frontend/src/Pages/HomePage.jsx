export default function HomePage(){
  return (
    <>
      
      <nav class="navbar navbar-expand-lg bg-tertiary border-bottom border-3 fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">TATAS</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
              <a class="nav-link" href="#">Courses</a>
              <a class="nav-link" href="#">Timeable</a>
              <a class="nav-link disabled" aria-disabled="true">Appointment</a>
            </div>
          </div>
        </div>
      </nav>

      
       
    </>
  )
}