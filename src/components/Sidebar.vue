<template>
  <aside class="main-sidebar main-sidebar-custom sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link text-center text-m">
      <span class="brand-text justify-content-center">KinoCMS</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>Статистика</p>
            </router-link>
            <ul class="nav nav-treeview">
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="/banner" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>Баннеры</p>
            </router-link>
            <ul class="nav nav-treeview">
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="/films" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Фильмы
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/cinemas" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Кинотеатры
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/news" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Новости
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/action" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Акции
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/pages" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Страницы
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/users" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Пользователи
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/mailing" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Рассылка
                <i class="fas fa-angle-left right"></i>
              </p>
            </router-link>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/films:id" class="nav-link ml-2">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Выбор пользователей</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
  </aside>
</template>

<script>

export default {
  data: () => ({
    name: 'Sergiy'
  })
}
</script>

<style lang="scss">
  aside.main-sidebar.main-sidebar-custom.sidebar-dark-primary.elevation-4{
    min-height: 100%;
  }
</style>
