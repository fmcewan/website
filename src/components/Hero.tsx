export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100vh] w-full text-white items-center justify-start overflow-hidden border-4 border-lime-500 bg-blackgruvbox">
        
        <div className="relative z-10">
            <h1 className="text-6xl md:text-8xl">
                Hi, my 
                <br></br>
                name is <span className="font-bold">Fraser McEwan</span>.
            </h1>
            <p className="mt-4 text-lg font-light md:text-4xl">
            I'm an <span>aspiring software developer</span> from Edinburgh, Scotland.
            </p>
        </div>


    </section>
  );
}