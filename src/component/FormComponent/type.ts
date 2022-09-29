interface CustomComponentPropsInterface {
    onBlur: () => void
    onChange: () => void
}

export type CustomComponentProps = Partial<CustomComponentPropsInterface>