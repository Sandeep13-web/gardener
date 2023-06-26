export type Props =  {
    modalType: string,
    confirmHeading: string,
    btnName: string,
    children?:any,
    showModal: boolean,
    btnFunction: () => void,
    cancelFuntion: () => void,
    isLoading: boolean,
}