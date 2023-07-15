import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { TbWorldHeart } from "react-icons/tb"

const About = () => {
  return (
    <>
      <div className="m-5 pt-5">
        <h1 className="text-center mt-5">Sobre nosotros</h1>
        <p className="fw-bolder justify mt-5">
          Bienvenido a nuestra tienda de libros online, donde nos apasiona
          promover la lectura y hacer que los libros estén al alcance de todos.
          Nuestra misión es fomentar el amor por la lectura, ofreciendo una
          amplia selección de libros de diferentes géneros y temáticas para
          satisfacer los gustos de nuestros clientes.
        </p>

        <h2 className="mt-5"> <BsFillArrowRightCircleFill style={{ color: 'darkblue' }} /> Nuestra visión</h2>
        <p className="fw-bolder justify">
          Queremos crear una comunidad de lectores apasionados, brindando un
          espacio virtual donde los amantes de los libros puedan encontrar
          títulos interesantes, compartir reseñas y recomendaciones, y
          conectarse con otros lectores de ideas afines.
        </p>

        <h2 className="mt-5"> <BsFillArrowRightCircleFill style={{ color: 'darkblue' }} /> Nuestro compromiso</h2>
        <p className="fw-bolder justify">
          En nuestra tienda, nos esforzamos por ofrecer una experiencia de
          compra excepcional. Trabajamos en estrecha colaboración con
          editoriales y autores para garantizar una amplia variedad de libros
          actualizados y de alta calidad. También nos preocupamos por brindar un
          excelente servicio al cliente, respondiendo a tus preguntas y
          atendiendo tus necesidades de manera oportuna.
        </p>

        <h2 className="text-center mt-5 pt-3">¡Únete a nuestra comunidad de lectores!</h2>
        <p className="fw-bolder mt-3 justify">
          Te invitamos a explorar nuestra tienda, descubrir nuevas historias y
          sumergirte en la maravillosa aventura de la lectura. No importa si
          eres un ávido lector o estás comenzando tu viaje literario, aquí
          encontrarás algo para ti. Si tienes alguna pregunta o necesitas ayuda,
          nuestro equipo estará encantado de asistirte. ¡Esperamos verte pronto
          en nuestra tienda de libros online!
        </p>
        <div className="d-flex justify-content-center">
          <TbWorldHeart style={{ color: "brown", fontSize: '70px', textAlign: "center" }} />
        </div>
      </div>
    </>
  );
};

export default About;
