function PopupWithForm(props)  {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
      <div className="popup__container">
        <button aria-label="Close" className="popup__button-close" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__${props.name}`} name="info-user" method="get" onSubmit={props.onSubmit} noValidate>
          {props.children}
          <input aria-label="Save" className="popup__button-save" type="submit" value={props.buttonText} />
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;