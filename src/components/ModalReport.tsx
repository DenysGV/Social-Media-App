import { useState } from "react"
import Modal from "./Modal"
import { useCreateReportMutation } from "../services/reportsApi"
import type { IReport, IUser } from "../types/types"
import PostItemPath from "./PostItemPath"
import { useAppSelector } from "../store/hooks"
import axios from "axios"
import { API_URL } from "../services/apiUrl"

const ModalReport = ({ postId, isOpen, setIsOpen }: { postId: string, isOpen: boolean, setIsOpen: Function }) => {
   const [dangerousAlert, setDangerousAlert] = useState<string>('')
   const [reportSelected, setReportSelected] = useState<boolean>(false)
   const [reportText, setReportText] = useState<string>('')
   const [createRepost, { isLoading, isSuccess }] = useCreateReportMutation()

   const user: IUser | null = useAppSelector((state) => state.user.user)

   const submitReportHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (user) {
         try {
            const res = await axios.get(`${API_URL}reports?userId=${user.id}&postId=${postId}`)
            if (res.data) {
               const filtredRes: IReport[] = res.data.filter((item: IReport) => item.postId == postId && item.userId == user.id)

               if (filtredRes.length) {
                  setDangerousAlert('The report has already been sent')
                  return
               }
            }

            const newReport: IReport = {
               id: `${new Date().getTime()}`,
               postId: postId,
               userId: user?.id,
               text: reportText,
            }

            createRepost(newReport)
         } catch (err) {
            setDangerousAlert('Failed to sent a report, please try again')
         }
      }
   }

   return (
      <Modal open={isOpen} setOpen={setIsOpen}>
         <div>
            <p className="text-sm text-color-primary-text pb-2">Actions</p>
            {isSuccess && <p className="alert_success">Report was successfully sent</p>}
            {dangerousAlert && <p className="alert_dangerous">{dangerousAlert}</p>}
            <PostItemPath postId={postId} />
            {!!user && <div>
               <div onClick={() => { setReportSelected(true) }} className={`py-2 my-2 w-full flex gap-2 px-3 items-center rounded-2xl cursor-pointer bg-color-secondary-bg transition ${reportSelected && 'border-b border-solid border-color-highlight'}`}>
                  <div>
                     <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_9_532)">
                           <path className="fill-color-primary-text" d="M0 2.07812C0 0.931 0.931 0 2.07812 0H16.9219C18.069 0 19 0.931 19 2.07812V13.3594C19 13.9105 18.7811 14.4391 18.3913 14.8288C18.0016 15.2186 17.473 15.4375 16.9219 15.4375H9.57125L6.51581 18.4929C6.27362 18.7342 5.96543 18.8984 5.63008 18.9648C5.29473 19.0312 4.94723 18.9968 4.63138 18.866C4.31554 18.7352 4.04549 18.5138 3.85527 18.2297C3.66506 17.9457 3.56318 17.6117 3.5625 17.2698V15.4375H2.07812C1.52697 15.4375 0.998393 15.2186 0.608669 14.8288C0.218945 14.4391 0 13.9105 0 13.3594L0 2.07812ZM2.07812 1.78125C1.99939 1.78125 1.92388 1.81253 1.8682 1.8682C1.81253 1.92388 1.78125 1.99939 1.78125 2.07812V13.3594C1.78125 13.5232 1.91425 13.6562 2.07812 13.6562H4.45312C4.68933 13.6562 4.91587 13.7501 5.08289 13.9171C5.24992 14.0841 5.34375 14.3107 5.34375 14.5469V17.1475L8.57375 13.9175C8.74061 13.7504 8.967 13.6565 9.20312 13.6562H16.9219C17.0006 13.6562 17.0761 13.625 17.1318 13.5693C17.1875 13.5136 17.2188 13.4381 17.2188 13.3594V2.07812C17.2188 1.99939 17.1875 1.92388 17.1318 1.8682C17.0761 1.81253 17.0006 1.78125 16.9219 1.78125H2.07812ZM10.3906 4.45312V7.42188C10.3906 7.65808 10.2968 7.88462 10.1298 8.05164C9.96274 8.21867 9.73621 8.3125 9.5 8.3125C9.26379 8.3125 9.03726 8.21867 8.87023 8.05164C8.70321 7.88462 8.60938 7.65808 8.60938 7.42188V4.45312C8.60938 4.21692 8.70321 3.99038 8.87023 3.82336C9.03726 3.65633 9.26379 3.5625 9.5 3.5625C9.73621 3.5625 9.96274 3.65633 10.1298 3.82336C10.2968 3.99038 10.3906 4.21692 10.3906 4.45312ZM10.6875 10.6875C10.6875 11.0024 10.5624 11.3045 10.3397 11.5272C10.117 11.7499 9.81494 11.875 9.5 11.875C9.18506 11.875 8.88301 11.7499 8.66031 11.5272C8.43761 11.3045 8.3125 11.0024 8.3125 10.6875C8.3125 10.3726 8.43761 10.0705 8.66031 9.84781C8.88301 9.62511 9.18506 9.5 9.5 9.5C9.81494 9.5 10.117 9.62511 10.3397 9.84781C10.5624 10.0705 10.6875 10.3726 10.6875 10.6875Z" fillOpacity="0.8" />
                        </g>
                        <defs>
                           <clipPath id="clip0_9_532">
                              <rect className="fill-color-primary-text" width="19" height="19" fill="white" />
                           </clipPath>
                        </defs>
                     </svg>
                  </div>
                  <p className="text-sm text-color-primary-text">Report</p>
               </div>
               {reportSelected && <form onSubmit={submitReportHandler} className="animate-fade__in">
                  <input className="w-full mb-2" type="text" placeholder="report message" value={reportText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setReportText(e.target.value) }} />
                  <button className="button" disabled={isLoading} type="submit">Report post</button>
               </form>}
            </div>}
         </div>
      </Modal >
   )
}

export default ModalReport