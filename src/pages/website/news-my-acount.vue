<template>
  <div class="relative overflow-x-auto mx-5 my-5">
    <h1 class="text-3xl my-5">Bài viết của tôi</h1>
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">#</th>
          <th scope="col" class="px-6 py-3">Tiêu đề bài viết</th>
          <th scope="col" class="px-6 py-3">Ảnh mô tả bài viết</th>
          <th scope="col" class="px-6 py-3">Nội dung bài viết</th>
          <th scope="col" class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="news in newss?.slice((page - 1) * 3, page * 3)"
          :key="news._id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th scope="row" class="px-6 py-4">{{ news._id }}</th>
          <td class="px-6 py-4">{{ news.title }}</td>
          <td class="px-6 py-4">
            <img width="70px" :src="news.featured_image" />
          </td>
          <td class="px-6 py-4">{{ news.content.substring(0, 150) }} .....</td>
          <td class="px-6 py-4">
            <a
              @click="remove(news._id)"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              >Delete</a
            >
            <a
              :href="'/newss/'+news._id+'/edit'"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              >Edit</a
            >
            <a
              :href="'/newss/' + news._id"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >View</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { getNewsByAcount, removeNewsById } from "../../services/news";
const page = ref(1);
const { data: newss } = useQuery({
  queryKey: ["news_by_acount"],
  queryFn: getNewsByAcount,
});
function nextPage() {
  if (page.value >= Math.ceil(newss.value.length / 3)) {
    page.value = 1;
  } else {
    page.value = page.value + 1;
  }
}
function prePage() {
  if (page.value <= 1) {
    page.value = Math.ceil(newss.value.length / 3);
    return;
  } else {
    page.value = page.value - 1;
  }
}
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: removeNewsById,
  onSuccess: () => {
    toast.success("Xóa bài viết thành công", {
      autoClose: 1000,
    });
    queryClient.invalidateQueries(["news_by_acount"]);
  },
});
function remove(id) {
  const confirm = window.confirm("Bạn có muốn xóa bài viết không ?");
  if (confirm) {
    mutation.mutate(id);
    page.value = 1;
  }
}
</script>