<template>
  <div class="wrapper">
    <footer class="navbar navbar-expand-md navbar-light navbar-white">
      <div class="container not-margin border-top border-info pt-3">
        <div class="footer-app col-4 d-flex flex-column justify-content-start">
          <div class="d-flex justify-content-center">
            <h5 style="color: rgba(0,0,0,.5)">{{ 'MobApp' | localize }}</h5>
          </div>
          <div class="d-flex mt-4 justify-content-center">
            <a href="#" class="mr-4">
              <i class="fab fa-google-play fa-3x"></i>
            </a>
            <a href="#">
              <i class="fab fa-app-store-ios fa-3x"></i>
            </a>
          </div>
        </div>
        <div class="footer-nav d-flex">
          <div class="d-flex flex-column">
            <ul class="d-flex flex-column navbar-nav">
              <li class="nav-item">
                <a class="nav-link"><h5>{{ 'Poster' | localize }}</h5></a>
              </li>
              <li class="nav-item">
                <a class="nav-link">{{ 'Schedule' | localize }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">{{ 'Soon' | localize }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">{{ 'Cinemas' | localize }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">{{ 'Actions' | localize }}</a>
              </li>
            </ul>
          </div>
          <div class="d-flex flex-column">
            <ul class="d-flex flex-column navbar-nav">
              <li class="nav-item">
                <a class="nav-link"><h5>{{ 'AboutCinema' | localize }}</h5></a>
              </li>
              <li class="nav-item">
                <a class="nav-link">{{ 'News' | localize }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">{{ 'Advertising' | localize }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">{{ 'Cafe' | localize }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">{{ 'MobApp' | localize }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-social">
          <ul class="navbar-nav ml-5">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-facebook-square fa-2x"></i>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-twitter-square fa-2x"></i>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-vk fa-2x"></i>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-instagram-square fa-2x"></i>
                </a>
              </li>
            </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
  .not-margin {
    max-width: 1000px;
    margin: 0 auto
  }
  .nav-link {
    padding: 0;
  }
</style>
