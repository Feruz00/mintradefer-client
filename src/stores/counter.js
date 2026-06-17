import { defineStore } from 'pinia'
import { ref } from 'vue'

const useCompany = defineStore('company', () => {
  const company = ref({
    titleEn: '',
    titleRu: '',
    titleTm: '',
  })

  const setCompany = (data) => {
    console.log(data)
    company.value.titleEn = data.companyNameEn
    company.value.titleRu = data.companyNameRu
    company.value.titleTm = data.companyNameTm
  }

  return {
    company,
    setCompany,
  }
})

export default useCompany
