import { cancelableInterval, getCurrentTime } from '~@/utils'
import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export const useCurrentTime = (): Ref<string> => {
  const time = ref(getCurrentTime())

  let timer: ReturnType<typeof cancelableInterval> | undefined = undefined

  onMounted(() => {
    getCurrentTime()

    timer = cancelableInterval(() => {
      time.value = getCurrentTime()
    }, 1000)
  })

  onUnmounted(() => {
    if (timer) timer()
  })

  return time
}
