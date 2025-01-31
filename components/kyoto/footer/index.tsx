export default function Footer() {
    return (
        <div className="flex justify-around items-center bg-second-grey bottom-0 shrink-0 p-8">
            <div id="foot-left" className="flex flex-col items-center">
                <h3 className="font-sourceCodePro font-bold p-2 text-second-beige text-center text-xl anim-darker">
                    Douglas Pineda Gutierrez
                </h3>
                <p className="kyoto-footer-p">Williams College | Summer 2023</p>
                <p id="email" className="kyoto-footer-p">
                    djp5@williams.edu
                </p>
            </div>
            <div id="foot-right" className="max-w-[500px] w-2/5">
                <p className="kyoto-footer-p leading-loose anim-darker">
                    I am so grateful to Ms. Gertrude Wilmers, the Wilmers Travel
                    Fellowship, and Williams College for making this
                    unforgettable experience possible
                </p>
            </div>
        </div>
    );
}
