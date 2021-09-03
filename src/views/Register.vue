<template>
  <div class="register-page">
    <div class="register-box">
      <div class="card card-outline card-info">
        <div class="card-header text-center">
          <h2>KinoCMS</h2>
        </div>
        <div class="card-body">
          <form method="post">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Name">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Lastname">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Nickname">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="far fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="email" class="form-control" placeholder="Email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" suggested="current-password" placeholder="Password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" suggested="current-password" placeholder="Retype password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="icheck-primary">
                  <input type="checkbox" id="agreeTerms" name="terms" value="agree">
                  <label for="agreeTerms">
                  Я погоджуюся
                  </label>
                </div>
              </div>
            </div>
            <div class="input-group mt-3 mb-3">
              <button type="submit" class="btn btn-info btn-block">Зареєструватися</button>
            </div>
          </form>
          <router-link to="/login" class="text-center text-info">Я зареєстрований, хочу ввійти</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
