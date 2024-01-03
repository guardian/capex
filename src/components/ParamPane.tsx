import { TextInput, Button } from "@guardian/source-react-components"
import "./ParamPane.css"
import { ChangeEvent, Fragment, useState } from "react"

export interface ParamsData {
  collapsed: boolean
  params: URLSearchParams
  updateParams: (p: URLSearchParams) => void
}

interface ParamRowData {
  paramName: string
  paramValue: string
  hideLabel: boolean
  updateParam: (k: string, v: string) => void
  removeParam: (k: string) => void
}

const ParamRow = ({ hideLabel, paramName, paramValue, updateParam, removeParam }: ParamRowData ) => {

  let [ currentValue, changeValue ] = useState(paramValue)

  const onValueChange = (ev: ChangeEvent<HTMLInputElement>) => {
    let newValue = ev.target.value
    changeValue(newValue)
    updateParam(paramName, newValue)
  }

  return (
    <li className="paramRow">
      <div><TextInput hideLabel={hideLabel} readOnly={true} label="parameter name" width={10} value={paramName}/></div>
      <div><TextInput hideLabel={hideLabel} label="value" width={30} value={currentValue} onChange={onValueChange}/></div>
      <div><Button size={"xsmall"} onClick={() => removeParam(paramName)}>X</Button></div>
    </li>
  )
}

interface ParamControlsData {
  newParam: (name: string) => void
  hide: () => void
}

function ParamControls({hide, newParam}: ParamControlsData) {
  let [addName, setAddName] = useState("")
  const addButtonClick = () => {
    let newName = addName
    if(newName.length > 0) {
      setAddName("")
      newParam(newName)
    }
  }
  return (
    <div className="buttons">
      <TextInput label="new param" width={10} value={addName} onChange={(ev) => setAddName(ev.target.value)}/>
      <Button size={"xsmall"} onClick={addButtonClick}>Add</Button>
      <Button size={"xsmall"} onClick={hide}>Hide</Button>
    </div>
  )

}

export function ParamPane( { params, updateParams }: ParamsData ) {

  console.log("ParamPane", params)

  let [collapsed, setCollapsed] = useState(true)

  let paramNames = Array.from(params.keys())

  function updateParam(k: string, v: string) {
    let newParams = new URLSearchParams(params)
    newParams.set(k, v)
    updateParams(newParams)
  }

  function removeParam(k: string) {
    let newParams = new URLSearchParams(params)
    newParams.delete(k)
    updateParams(newParams)
  }

  function newParam(name: string) {
    let newParams = new URLSearchParams(params)
    newParams.set(name, "")
    updateParams(newParams)
  }

  let paramElements = paramNames.map((name, idx) =>
    <ParamRow
      key={idx}
      hideLabel={idx > 0}
      paramName={name}
      paramValue={params.get(name) as string}
      updateParam={updateParam}
      removeParam={removeParam}
    />
  )

  let content = collapsed ? <Button size={"xsmall"} onClick={() => setCollapsed(false)}>Edit Params</Button> :
    <Fragment>
      <div className="paramElements">{paramElements}</div>
      <ParamControls hide={() => setCollapsed(true)} newParam={newParam}/>
    </Fragment>

  return (
    <div id="ParamPane" className="pane">
      { content }
    </div>
  )
}
