import { useEffect } from 'react'
import { toast } from 'sonner'

const useMessage = (error) => {
  useEffect(() => {
    error?.response?.data?.errors?.map(error => (
      toast.error(error.msg, {
        duration: 2000
      })
    ))
  }, [error])
}

export {
  useMessage
}
