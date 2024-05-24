<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-20 w-auto"
        src="https://res.cloudinary.com/dtsfrv4lf/image/upload/v1716382551/18198154_10208600482868814_3469513_n-234x375_t7zlcf.png"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Đăng ký tài khoản
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Email</label
          >
          <div class="mt-2">
            <input
              v-model.trim="email"
              type="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="dongtnph21313@fpt.edu.vn"
            />
            <p v-if="emailError" class="text-red-500 mt-5">{{ emailError }}</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Tên đăng nhập</label
          >
          <div class="mt-2">
            <input
              v-model.trim="name"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Trần Ngọc Đông"
            />
            <p v-if="nameError" class="text-red-500 mt-5">{{ nameError }}</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Mật khẩu</label
          >
          <div class="mt-2">
            <input
              v-model.trim="password"
              type="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="******"
            />
            <p v-if="passwordError" class="text-red-500 mt-5">
              {{ passwordError }}
            </p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Xác nhận mật khẩu</label
          >
          <div class="mt-2">
            <input
              v-model.trim="confirmPassword"
              type="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="******"
            />
            <p v-if="confirmPasswordError" class="text-red-500 mt-5">
              {{ confirmPasswordError }}
            </p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Link ảnh đại diện</label
          >
          <div class="mt-2">
            <input
              v-model.trim="avatar"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://res.cloudinary.com/dtsfrv4lf/image/upload/v1716382551/18198154_10208600482868814_3469513_n-234x375_t7zlcf.png"
            />
            <p v-if="avatarError" class="text-red-500 mt-5">
              {{ avatarError }}
            </p>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Đăng ký
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
import { z } from "zod";
import { signup } from "../services/auth";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
const schema = z
  .object({
    email: z.string().email("Chưa đúng định dạng email").default(""),
    name: z.string().min(6, "Tên đăng nhập ít nhất 6 ký tự").default(""),
    password: z
      .string()
      .min(6, {
        message: "Cần nhập mật khẩu trên 6 kí tự",
      })
      .default(""),
    avatar: z.string().min(1, "Cần nhập link ảnh đại diện").default(""),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Cần nhập lại mật khẩu trên 6 kí tự",
      })
      .default(""),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    path: ["confirmPassword"],
  });
export default {
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: toTypedSchema(schema),
    });
    const { value: email, errorMessage: emailError } = useField(
      "email",
      schema
    );
    const { value: name, errorMessage: nameError } = useField("name", schema);
    const { value: password, errorMessage: passwordError } = useField(
      "password",
      schema
    );
    const { value: confirmPassword, errorMessage: confirmPasswordError } =
      useField("confirmPassword", schema);
    const { value: avatar, errorMessage: avatarError } = useField(
      "avatar",
      schema
    );
    const router = useRouter();
    const mutation = useMutation({
      mutationFn: signup,
      onSuccess: (res) => {
        if (res.user) {
          toast.success(res.message, {
            autoClose: 1000,
          });
          setTimeout(() => {
            router.replace("/signin");
          }, 2000);
        } else {
          toast.error(res.messages[0], {
            autoClose: 1000,
          });
        }
      },
    });
    const onSubmit = handleSubmit((values) => {
      mutation.mutate(values);
    });
    return {
      email,
      emailError,
      onSubmit,
      name,
      nameError,
      password,
      passwordError,
      confirmPassword,
      confirmPasswordError,
      avatar,
      avatarError,
    };
  },
};
</script>