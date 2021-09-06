<template>
  <aside class="main-sidebar main-sidebar-custom sidebar-dark-primary elevation-4">
    <a href="#" class="brand-link text-center text-m">
      <span class="brand-text justify-content-center">KinoCMS</span>
    </a>
    <div class="sidebar">
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>Статистика</p>
            </router-link>
            <ul class="nav nav-treeview">
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="/admin/banner" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>Баннеры</p>
            </router-link>
            <ul class="nav nav-treeview">
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="/admin/films" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Фильмы
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/admin/cinemas" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Кинотеатры
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/admin/news" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Новости
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/admin/action" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Акции
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/admin/pages" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Страницы
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/users" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Пользователи
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/admin/mailing" class="nav-link">
              <i class="nav-icon fas fa-circle"></i>
              <p>
                Рассылка
              </p>
            </router-link>
          </li>
        </ul>
      </nav>
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
