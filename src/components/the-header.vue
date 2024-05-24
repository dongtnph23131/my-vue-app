<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="h-12 w-auto"
              src="https://res.cloudinary.com/dtsfrv4lf/image/upload/v1716382551/18198154_10208600482868814_3469513_n-234x375_t7zlcf.png"
              alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                href="/"
                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                aria-current="page"
                >Trang chủ</a
              >
              <a
               v-if="user"
                href="/create-news"
                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >Tạo bài viết</a
              >
              <a
                v-if="user"
                href="/news-my-acount"
                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >Bài viết của tôi</a
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div v-if="user" class="relative ml-3">
            <div>
              <button
                type="button"
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="absolute -inset-1.5"></span>
                <img class="h-8 w-8 rounded-full" :src="user.avatar" alt="" />
              </button>
            </div>
          </div>
          <button
           @click="logout"
            v-if="user"
            type="button"
            class="py-2 mx-2 px-4 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Đăng xuất
          </button>
          <a href="/signin" v-if="!user"
            ><button
              type="button"
              class="py-2 mx-2 px-4 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Đăng nhập
            </button></a
          >
          <a href="/signup" v-if="!user"
            ><button
              type="button"
              class="py-2 mx-2 px-4 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Đăng ký
            </button></a
          >
        </div>
      </div>
    </div>

    <div class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a
          href="/"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          aria-current="page"
          >Trang chủ</a
        >
        <a
          v-if="user"
          href="/create-news"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >Tạo bài viết</a
        >
        <a
          v-if="user"
          href="/news-my-acount"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >Bài viết của tôi</a
        >
      </div>
    </div>
  </nav>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const user = ref(JSON.parse(localStorage.getItem("user")));
    const router=useRouter()
    function logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      user.value=null
      router.replace('/')
    }
    return {
      user,
      logout
    };
  },
};
</script>