import { useModal } from './components/Modal';

export const Testing: React.FC = () => {
    const [toggleActive, Modal] = useModal(
        <>
            <div className="item-modal">
                <div className="item-form">Form</div>
                <div className="rollable-prop-form">rollable</div>
            </div>
        </>
    );
    return (
        <div
            style={{
                background: 'white',
                height: '100vh',
                gridColumn: '1/-1',
            }}>
            <button onClick={() => toggleActive()}>Toggle Active</button>
            {Modal}
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nostrum aliquid quasi exercitationem fugiat rem, quae
                perferendis hic quas, cum eaque quibusdam consectetur similique
                fuga, illo provident ab soluta voluptatem harum. Optio odio modi
                tenetur! Minima inventore ipsa vero vitae commodi quos aliquid
                obcaecati ratione possimus iusto, hic esse minus culpa?
            </p>
        </div>
    );
};
