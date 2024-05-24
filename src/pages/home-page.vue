<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h2
          class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
        >
          Tất cả các bài viết
        </h2>
      </div>
      <div class="grid gap-8 lg:grid-cols-3">
        <article
          v-for="news in newss"
          :key="news._id"
          class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex justify-between items-center mb-5 text-gray-500">
            <span class="text-sm">{{ formatISODate(news.createdAt) }}</span>
          </div>
          <h2
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            <a :href="'/newss/' + news._id">{{ news.title }}</a>
          </h2>
          <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
            {{ news.content.substring(0, 200) }} ...
          </p>
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <img
                class="w-7 h-7 rounded-full"
                :src="news.author_id.avatar"
                alt="Jese Leos avatar"
              />
              <span class="font-medium dark:text-white">
                {{ news.author_id.name }}
              </span>
            </div>
            <a
              :href="'/newss/' + news._id"
              class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
            >
              Read more
              <svg
                class="ml-2 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
  <nav class="flex justify-center mb-10">
    <ul class="flex items-center -space-x-px h-8 text-sm">
      <li @click="prePage">
        <a
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            class="w-2.5 h-2.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </a>
      </li>
      <li>
        <a
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >{{ page }}</a
        >
      </li>
      <li @click="nextPage">
        <a
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            class="w-2.5 h-2.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script setup>
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import { getAllNews, getAllNewsNoPage } from "../services/news";
const page = ref(1);
const limit = ref(3);
const { data: newss } = useQuery({
  queryKey: ["News_key", { page, limit }],
  queryFn: getAllNews,
});
const { data: newssAll } = useQuery({
  queryKey: ["News_key_all"],
  queryFn: getAllNewsNoPage,
});
function formatISODate(isoString) {
  var date = new Date(isoString);
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, "0");
  var day = date.getDate().toString().padStart(2, "0");
  var hours = date.getHours().toString().padStart(2, "0");
  var minutes = date.getMinutes().toString().padStart(2, "0");
  var seconds = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function nextPage() {
  if (page.value >= Math.ceil(newssAll.value.length / Number(limit.value))) {
    page.value = 1;
  } else {
    page.value = page.value + 1;
  }
}
function prePage() {
  if (page.value <= 1) {
    page.value = Math.ceil(newssAll.value.length / Number(limit.value));
    return;
  } else {
    page.value = page.value - 1;
  }
}
</script>