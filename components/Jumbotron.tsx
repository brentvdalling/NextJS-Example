type JumbotronType = {
    title: any,
    description: any,
    buttons: any,
    background: any,
}

const Jumbotron:React.FC<JumbotronType> = ({title, description, buttons, background}) => {

    return (
        <div 
            className={`w-full md:p-20 p-7 flex flex-wrap flex-col items-center justify-center ${background.color}`}
            style={{ 
                height: background.height, 
                backgroundImage: background.image, 
                backgroundRepeat: background.repeat, 
                backgroundSize: background.size, 
                backgroundPosition: background.position, 
                backgroundBlendMode:"multiply"
            }}
        >
            <div className="w-full md:w-1/3 mx-auto flex flex-col flex-wrap p-5">
                <div className={title.classes}>{title.text}</div>
                <div className={description.classes}>{description.text}</div>
                <div className="pt-3 flex flex-row flex-wrap">
                    
                </div>
            </div>
        </div>
    );
}

export default Jumbotron;