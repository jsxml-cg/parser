const VOID_TAGS =
  'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr'

export const isVoidTag = (value: string) => VOID_TAGS.includes(value)
