import { Rol } from '../rol/entities/rol.entity';
import AppDataSource from '../config/typeorm';
import { Facultad } from '../facultad/entities/facultad.entity';
import { Persona } from '../persona/entities/persona.entity';

const persona = [
  {
    nombre: 'Admin',
    apellido: 'Admin',
    correo: 'admin@utm.edu.ec',
    contrasena: 'Admin',
    cedula: '1234567890',
    roles: 'Administrador',
  },
  {
    nombre: 'estudiante 1',
    apellido: 'est',
    correo: 'estudiante@utm.edu.ec',
    contrasena: 'Estudiante',
    cedula: '1324567890',
    roles: 'Estudiante',
  },
  {
    nombre: 'Funcionario 1',
    apellido: 'Admin',
    correo: 'funcionario@utm.edu.ec',
    contrasena: 'Funcionario',
    cedula: '1234657890',
    roles: 'Funcionario',
  },
  {
    nombre: 'Docente 1',
    apellido: 'Docente',
    correo: 'docente@utm.edu.ec',
    contrasena: 'Docente',
    cedula: '1234567980',
    roles: 'Docente',
  },
];

const seed = async () => {
  await AppDataSource.initialize();
  const faultadRepository = AppDataSource.getRepository(Facultad);
  const rolesRepository = AppDataSource.getRepository(Rol);
  const personaRepository = AppDataSource.getRepository(Persona);

  const facultades = faultadRepository.create([
    {
      nombre: 'Facultad de Ingeniería y Ciencias Aplicadas',
      carrera: [
        { nombre: 'Electricidad' },
        { nombre: 'Ingeniería Civil' },
        { nombre: 'Mecánica' },
        { nombre: 'Ingeniería Industrial' },
        { nombre: 'Ingeniería Química' },
        { nombre: 'Biotecnología' },
        { nombre: 'Electrónica y Automatización' },
        { nombre: 'Alimentos' },
        { nombre: 'Arquitectura' },
        { nombre: 'Geología' },
        { nombre: 'Mecatrónica' },
      ],
    },
    {
      nombre: 'Facultad de Ciencias de la Salud',
      carrera: [
        { nombre: 'Enfermería' },
        { nombre: 'Laboratorio Clínico' },
        { nombre: 'Medicina' },
        { nombre: 'Optometría' },
        { nombre: 'Nutrición y Dietética' },
        { nombre: 'Bioquímica y Farmacia' },
      ],
    },
    {
      nombre: 'Facultad de Ciencias Veterinarias',
      carrera: [{ nombre: 'Medicina Veterinaria' }, { nombre: 'Biología' }],
    },
    {
      nombre: 'Facultad de Agrociéncias',
      carrera: [
        { nombre: 'Agroindustria' },
        { nombre: 'Zootecnia' },
        { nombre: 'Agronegocios' },
        { nombre: 'Biodiversidad y Recursos Genéticos' },
      ],
    },
    {
      nombre: 'Facultad de Ciencias Administrativas y Económicas',
      carrera: [
        { nombre: 'Administración de Empresas (Modalidad Híbrida)' },
        { nombre: 'Administración de Empresas (Modalidad En Línea)' },
        { nombre: 'Contabilidad y Auditoría (Modalidad Híbrida)' },
        { nombre: 'Economía (Modalidad Híbrida)' },
        { nombre: 'Economía (Modalidad En Línea)' },
        { nombre: 'Gastronomía' },
        { nombre: 'Turismo (Modalidad Híbrida)' },
        { nombre: 'Turismo (Modalidad En Línea)' },
        { nombre: 'Negocios Digitales (Modalidad En Línea)' },
      ],
    },
    {
      nombre: 'Facultad de Ciencias de la Educación',
      carrera: [
        { nombre: 'Educación Básica' },
        { nombre: 'Educación Básica (Modalidad En Línea)' },
        { nombre: 'Educación Inicial' },
        { nombre: 'Educación Inicial (Modalidad En Línea)' },
        { nombre: 'Pedagogía de los Idiomas Nacionales y Extranjeros' },
        {
          nombre:
            'Pedagogía de las Ciencias Experimentales (Química y Biología)',
        },
        {
          nombre:
            'Pedagogía de las Ciencias Experimentales (Matemáticas y la Física)',
        },
        { nombre: 'Pedagogía de Actividad Física y Deporte' },
        { nombre: 'Pedagogía de la Lengua y Literatura' },
        { nombre: 'Pedagogía Musical' },
        { nombre: 'Psicopedagogía' },
        { nombre: 'Entrenamiento Deportivo' },
      ],
    },
    {
      nombre: 'Facultad de Ciencias Informáticas',
      carrera: [
        {
          nombre: 'Ingeniería en Sistemas Informáticos',
        },
        {
          nombre: 'Tecnologías de la Información',
        },
        {
          nombre: 'Tecnologías de la Información (Modalidad En Línea)',
        },
        {
          nombre: 'Telecomunicaciones',
        },
        {
          nombre: 'Computación',
        },
        {
          nombre: 'Software',
        },
        {
          nombre: 'Realidad Virtual y Videojuegos (Modalidad Híbrida)',
        },
      ],
    },
    {
      nombre: 'Facultad de Acuicultura y Ciencias del Mar',
      carrera: [
        {
          nombre: 'Acuicultura',
        },
        {
          nombre: 'Recursos Naturales Renovables',
        },
      ],
    },
    {
      nombre: 'Facultad de Ciencias Humanísticas y Sociales',
      carrera: [
        {
          nombre:
            'Bibliotecología, Documentación y Archivo (Modalidad Híbrida)',
        },
        {
          nombre: 'Psicología',
        },
        {
          nombre: 'Psicología (Modalidad En Línea)',
        },
        {
          nombre: 'Trabajo Social',
        },
        {
          nombre: 'Trabajo Social (Modalidad En Línea)',
        },
        {
          nombre: 'Derecho (Modalidad En Línea)',
        },
        {
          nombre: 'Derecho (Modalidad Híbrida)',
        },
        {
          nombre: 'Sociología (Modalidad En Línea)',
        },
      ],
    },
    {
      nombre: 'Facultad de Ingeniería Agrícola',
      carrera: [
        {
          nombre: 'Ingeniería Agrícola',
        },
        {
          nombre: 'Tecnologías Geoespaciales',
        },
      ],
    },
    {
      nombre: 'Facultad de Ingeniería Agronómica',
      carrera: [
        {
          nombre: 'Agronomía',
        },
        {
          nombre: 'Ingeniería Ambiental',
        },
        {
          nombre: 'Agroecología',
        },
      ],
    },
    {
      nombre: 'Facultad de Ciencias Básicas',
      carrera: [
        {
          nombre: 'Matemática Aplicada',
        },
        {
          nombre: 'Química',
        },
        {
          nombre: 'Estadística',
        },
        {
          nombre: 'Física',
        },
      ],
    },
  ]);

  const roles = rolesRepository.create([
    { nombre: 'Administrador' },
    { nombre: 'Estudiante', pago_diario: 1.0, pago_mensual: 25.00, tiempo: 1, cupo: 40 },
    { nombre: 'Docente', pago_diario: 1.5, pago_mensual: 30.00, tiempo: 1, cupo: 40 },
    { nombre: 'Funcionario', pago_diario: 1.5, pago_mensual: 30.00, tiempo: 1, cupo: 40 },
    { nombre: 'Entrenador' },
  ]);

  Promise.all([
    persona.map(async (u) => {
      const newPersona = personaRepository.create({
        nombre: u.nombre,
        apellido: u.apellido,
        correo: u.correo,
        contrasena: u.contrasena,
        cedula: u.cedula,
        roles: [roles.find((r) => r.nombre === u.roles)],
      });

      return await personaRepository.save(newPersona);
    }),
  ]);

  await faultadRepository.save(facultades);
  await rolesRepository.save(roles);
  console.log('Datos insertados correctamente.');
};

seed().catch((error) => console.log(error));
