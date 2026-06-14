<template>
  <div class="minPhone:h-full xl:h-[120px] bg-main-color">
    <Navbar />
  </div>
  <Loading v-if="isLoading" />
  <Error v-else-if="isError" @retry="refetch" />
  <div
    v-else
    class="minPhone:mt-10 xl:mt-20 minPhone:px-4 xl:px-[102px] grid minPhone:grid-cols-1 xl:grid-cols-[max-content_max-content] minPhone:gap-12 xl:gap-[126px] place-content-center place-items-center"
  >
    <div class="grid minPhone:gap-10 xl:gap-20">
      <div class="grid gap-2">
        <h1 class="text-4xl font-semibold cursor-default text-text-color">
          {{ t('contact_us') }}
        </h1>
        <p class="text-base font-medium cursor-default text-placeholder-text-color">
          {{ t('company') }}
        </p>
      </div>
      <div
        class="grid minPhone:grid-cols-1 xl:grid-cols-[max-content_max-content] minPhone:gap-4 xl:gap-10"
      >
        <div class="grid gap-4">
          <div class="grid grid-cols-[max-content_max-content] gap-2">
            <HomeOutlined />
            <p class="text-base font-semibold cursor-default text-main-color">
              {{ t('our_address') }}
            </p>
          </div>

          <p
            class="text-base font-medium cursor-default text-text-color minPhone:w-full xl:w-[15vw]"
          >
            {{ data.data.address }}
          </p>
        </div>
        <div class="grid gap-4">
          <div class="grid grid-cols-[max-content_max-content] gap-2">
            <PhoneOutlined />
            <p class="text-base font-semibold cursor-default text-main-color">
              {{ t('phone_number') }}
            </p>
          </div>
          <p class="text-base font-medium cursor-default text-text-color">
            {{ data.data.phoneNumber }}
          </p>
        </div>
        <div class="grid gap-4">
          <div class="grid grid-cols-[max-content_max-content] gap-2">
            <MailOutlined />
            <p class="text-base font-semibold cursor-default text-main-color">{{ t('email') }}</p>
          </div>
          <p class="text-base font-medium cursor-default text-text-color">
            {{ data.data.email }}
          </p>
        </div>
      </div>
    </div>
    <form
      @submit.prevent="onSubmit"
      class="py-6 xl:py-14 px-4 xl:px-8 bg-white shadow-lg rounded-[30px] grid gap-8 place-items-center relative z-10 w-full"
    >
      <div class="grid minPhone:grid-cols-1 xl:grid-cols-[max-content_max-content] gap-6 w-full">
        <div class="grid items-start w-full gap-2">
          <p class="text-sm font-medium text-gray-700">{{ t('first_name') }}</p>
          <input
            id="name"
            name="name"
            class="w-full py-3 pl-4 pr-5 border outline-none my-input border-stroke-color rounded-2xl undefined"
            value=""
            v-model="form.firstName"
            :placeholder="t('first_name_placeholder')"
          />
        </div>
        <div class="grid items-start w-full gap-2">
          <p class="text-sm font-medium text-gray-700">{{ t('last_name') }}</p>
          <input
            id="lastname"
            name="lastname"
            v-model="form.lastName"
            :placeholder="t('last_name_placeholder')"
            class="w-full py-3 pl-4 pr-5 border outline-none my-input border-stroke-color rounded-2xl undefined"
          />
        </div>
      </div>
      <div class="grid items-start w-full gap-2">
        <p class="text-sm font-medium text-gray-700">{{ t('your_email') }}</p>
        <input
          id="mail"
          name="mail"
          v-model="form.email"
          type="email"
          placeholder="example@gmail.com"
          class="w-full py-3 pl-4 pr-5 border outline-none my-input border-stroke-color rounded-2xl undefined"
          value=""
        />
      </div>
      <div class="grid items-start w-full gap-2">
        <p class="text-sm font-medium text-gray-700">{{ t('your_phone') }}</p>
        <input
          id="phone"
          name="phone"
          v-model="form.phone"
          :placeholder="t('phone_placeholder')"
          class="w-full py-3 pl-4 pr-5 border outline-none my-input border-stroke-color rounded-2xl undefined"
        />
      </div>
      <div class="grid items-start w-full gap-2">
        <p class="text-sm font-medium text-gray-700">{{ t('your_message') }}</p>
        <textarea
          class="w-full py-3 pl-4 pr-5 border outline-none resize-none my-input border-stroke-color rounded-2xl"
          v-model="form.message"
          :placeholder="t('message_placeholder')"
          rows="4"
        ></textarea>
      </div>
      <button
        type="submit"
        :disabled="isPending"
        class="px-12 py-3 text-base font-semibold text-white transition-all duration-300 bg-main-color shadow-two rounded-2xl hover:bg-buttonHovercolor disabled:opacity-50"
      >
        {{ isPending ? '...' : t('send') }}
      </button>
    </form>
    <div
      class="minPhone:hidden xl:block w-[564px] h-[490px] bg-main-color absolute bottom-0 right-0"
    ></div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'
import { useGetContact, useSendContact } from '@/services/useContact'
import Navbar from '@/common/Navbar.vue'

const { t } = useI18n()

const { isLoading, data, error, isError, refetch } = useGetContact()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
})

const { mutate, isPending } = useSendContact()

const validate = () => {
  if (!form.firstName.trim()) {
    toast.error(t('validation_required'))
    return false
  }

  if (!form.lastName.trim()) {
    toast.error(t('validation_required'))
    return false
  }

  if (!form.email.trim()) {
    toast.error(t('validation_required'))
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(form.email)) {
    toast.error(t('validation_email'))
    return false
  }

  if (!form.phone.trim()) {
    toast.error(t('validation_required'))
    return false
  }

  const phoneRegex = /^[+]?[0-9\s()-]{7,20}$/

  if (!phoneRegex.test(form.phone)) {
    toast.error(t('validation_phone'))
    return false
  }

  if (!form.message.trim()) {
    toast.error(t('validation_required'))
    return false
  }

  return true
}

const onSubmit = () => {
  if (!validate()) return

  mutate(
    {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      message: form.message,
    },
    {
      onSuccess: () => {
        toast.success(t('message_sent'))

        form.firstName = ''
        form.lastName = ''
        form.email = ''
        form.phone = ''
        form.message = ''
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || t('message_error'))
      },
    },
  )
}
</script>
