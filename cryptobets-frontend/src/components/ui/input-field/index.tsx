import React from 'react'

import styles from './styles.module.scss'

interface InputFieldProps {
  label: string
  name: string
  value: string | number
  onChange: (e: any) => void
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange }) => {
  return (
    <div className={styles.inputBlock}>
      <span className={styles.inputBlock__label}>{label}</span>
      <input className={styles.inputBlock__input} name={name} type="text" value={value} onChange={onChange} />
    </div>
  )
}

export default InputField
