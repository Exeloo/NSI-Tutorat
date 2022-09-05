import type { Timestamp } from 'firebase/firestore'
import { createMessage, getMessages } from '../data/firestore/datas/Relations'

export const activeChat = ref('')
export const messages = ref(new Map<string, [string, { timestamp: Timestamp; author: string; message: string }][]>())
export const hasInitConvs = ref(new Map<string, boolean>())
export const unreadMessages = ref<Map<string, number>>(new Map<string, number>([['32uraR9dWEiXLpXOISo7', 2]]))
export const inputContent = reactive({})

export const changeActiveChat = (id: string) => {
  activeChat.value = id
}

export const initConv = async(id: string) => {
  hasInitConvs.value.set(id, true)
  if (!activeChat.value)
    activeChat.value = id
  messages.value.set(id, await getMessages(id))
  return true
}

export const sendMessage = () => {
  if (!inputContent[activeChat.value]) return
  createMessage(activeChat.value, <string>inputContent[activeChat.value])
  inputContent[activeChat.value] = ''
}
