<template>
  <div class="max-w-screen-lg mx-auto">
    <main class="mt-10" v-if="news">
      <div class="mb-4 md:mb-0 w-full mx-auto relative">
        <div class="px-4 lg:px-0">
          <h2
            class="text-4xl font-semibold text-gray-800 leading-tight py-2 mb-2"
          >
            {{ news?.title }}
          </h2>
        </div>

        <img
          :src='news?.featured_image'
          class="w-full object-cover lg:rounded"
          style="height: 28em"
        />
      </div>

      <div class="flex flex-col lg:flex-row lg:space-x-12">
        <div
          class="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4"
        >
          <p class="pb-6">
           {{ news?.content }}
          </p>
        </div>

        <div class="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
          <div class="p-4 border-t border-b md:border md:rounded">
            <div class="flex py-2">
              <img
                class="w-[70px] mx-2"
                :src="news?.author_id?.avatar"
              />
              <div>
                <p class="font-semibold text-gray-700 text-sm">{{ news?.author_id?.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { getNewsById } from "../../services/news";
export default {
  setup() {
    const route = useRoute();
    const { data: news } = useQuery({
      queryKey: ["News_key"],
      queryFn: async () => {
        return await getNewsById(route.params.id);
      },
    });
    return {
      news,
    };
  },
};
</script>