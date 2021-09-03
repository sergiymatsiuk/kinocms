<template>
  <div class="wrapper">
    <nav class="navbar navbar-expand-md navbar-light navbar-white">
      <div class="container not-margin">
        <router-link to='/main' class="navbar-brand">
          <span class="brand-text font-weight-light">KinoCMS</span>
        </router-link>
        <div class="d-flex flex-column col-10">
          <div class="d-flex justify-content-end">
            <form class="form-inline ml-0 ml-md-3">
              <div class="input-group input-group-sm">
                <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-navbar" type="submit">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
            <ul class="navbar-nav ml-5">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-facebook-square"></i>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-twitter-square"></i>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-vk"></i>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-instagram-square"></i>
                </a>
              </li>
            </ul>
            <div class="ml-5">
              <div class="">(048) 777-77-77</div>
              <div class="">(097) 777-77-77</div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a href="#" class="nav-link">Афиша</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Расписание</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Скоро</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Кинотеатры</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Акции</a>
              </li>
              <li class="nav-item dropdown">
                <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link dropdown-toggle">О кинотеатре</a>
                <ul aria-labelledby="dropdownSubMenu1" class="dropdown-menu border-0 shadow">
                  <li><a href="#" class="dropdown-item">Новости</a></li>
                  <li><a href="#" class="dropdown-item">Реклама</a></li>
                  <li><a href="#" class="dropdown-item">Кафе</a></li>
                  <li><a href="#" class="dropdown-item">Мобильные прил</a></li>
                  <li><a href="#" class="dropdown-item">Контакты</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
  .not-margin {
    max-width: 1000px;
    margin: 0 auto
  }
</style>
