<template>
  <div class="flex min-h-full flex-1 flex-col justify-center">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Chỉnh sửa bài viết
      </h2>
    </div>

    <div class="mx-20 my-20">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Tiêu đề bài viết</label
          >
          <div class="mt-2">
            <input
              type="text"
              v-model.trim="title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p v-if="titleError" class="text-red-500 mt-5">{{ titleError }}</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Nội dung bài viết</label
          >
          <div class="mt-2">
            <textarea
              type="text"
              v-model.trim="content"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
            <p v-if="contentError" class="text-red-500 mt-5">
              {{ contentError }}
            </p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Link ảnh mô tải bài viết</label
          >
          <div class="mt-2">
            <input
              type="text"
              v-model.trim="featured_image"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p v-if="featured_imageError" class="text-red-500 mt-5">
              {{ featured_imageError }}
            </p>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Chỉnh sửa bài viết
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { useMutation } from "@tanstack/vue-query";
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import { z } from "zod";
import { editNews } from "../../../services/news";
import { toast } from "vue3-toastify";
import { onBeforeMount, onMounted } from "vue";
import axios from "axios";
import api_URI from "../../../config/uri_api";
const schema = z.object({
  title: z.string().min(6, "Tiêu đề bài viết trên 6 ký tự"),
  content: z.string().min(1, {
    message: "Bạn cần điền nội dung bài viết",
  }),
  featured_image: z.string().min(1, "Bạn cần điền link ảnh mô tả bài viết"),
});
export default {
  setup() {
    const { handleSubmit, setFieldValue } = useForm({
      validationSchema: toTypedSchema(schema),
    });
    const { value: title, errorMessage: titleError } = useField(
      "title",
      schema
    );
    const { value: content, errorMessage: contentError } = useField(
      "content",
      schema
    );
    const { value: featured_image, errorMessage: featured_imageError } =
      useField("featured_image", schema);
    const route = useRoute();
    const router = useRouter();
    const mutation = useMutation({
      mutationFn: editNews,
      onSuccess: (res) => {
        if (res.response) {
          toast.success(res.message, {
            autoClose: 1000,
          });
          setTimeout(() => {
            router.replace("/news-my-acount");
          }, 2000);
        } else {
          toast.error(res.message, {
            autoClose: 1000,
          });
        }
      },
    });
    const onSubmit = handleSubmit((values) => {
      mutation.mutate({ _id: route.params.id, ...values });
    });
    onMounted(() => {
      (async () => {
        const {data} = await axios.get(
          `${api_URI()}/newss/${route.params.id}`
        );
        setFieldValue('title', data.title)
        setFieldValue('content', data.content)
        setFieldValue('featured_image',data.featured_image)
      })();
    });
    return {
      title,
      titleError,
      content,
      contentError,
      featured_image,
      featured_imageError,
      onSubmit,
    };
  },
};
</script>