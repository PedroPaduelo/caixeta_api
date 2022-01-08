import  { useContextSelector } from 'use-context-selector'
import  { ContextWorkFlow } from '../../Context/WKF/ContextWorkFlow'

export function useWorkFlow(){
  // Context Set WKF
  const set_wkf = useContextSelector(ContextWorkFlow, (state) => state.set_wkf)
  // Context Set WKF

  // Context Var WKF
  const wkf =useContextSelector(ContextWorkFlow, (state) => state.wkf)
  const wkfs = useContextSelector(ContextWorkFlow, (state) => state.wkfs)
  // Context Var WKF

  // Context Function Crud
  const CreatWkf = useContextSelector(ContextWorkFlow, (state) => state.CreatWkf)
  const UpdateWkf = useContextSelector(ContextWorkFlow, (state) => state.UpdateWkf)
  const ListWkf = useContextSelector(ContextWorkFlow, (state) => state.ListWkf)
  const DeletWkf = useContextSelector(ContextWorkFlow, (state) => state.DeletWkf)
  // Context Function Crud



  return {
    set_wkf,

    wkf,
    wkfs,

    CreatWkf,
    UpdateWkf,
    ListWkf,
    DeletWkf
  }
}