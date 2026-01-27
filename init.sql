-- Table: public.productos

-- DROP TABLE IF EXISTS public.productos;

CREATE TABLE IF NOT EXISTS public.productos
(
    id integer NOT NULL DEFAULT nextval('productos_id_seq'::regclass),
    nombre character varying(100) COLLATE pg_catalog."default" NOT NULL,
    descripcion text COLLATE pg_catalog."default" NOT NULL,
    precio numeric(10,2) NOT NULL,
    stock integer NOT NULL,
    categoria character varying(50) COLLATE pg_catalog."default",
    activo boolean NOT NULL DEFAULT true,
    fecha_creacion timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT productos_pkey PRIMARY KEY (id),
    CONSTRAINT productos_precio_check CHECK (precio > 0::numeric),
    CONSTRAINT productos_stock_check CHECK (stock >= 0)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.productos
    OWNER to postgres;
    -- Table: public.orden_detalle

-- DROP TABLE IF EXISTS public.orden_detalle;

CREATE TABLE IF NOT EXISTS public.orden_detalle
(
    id integer NOT NULL DEFAULT nextval('orden_detalle_id_seq'::regclass),
    order_id integer NOT NULL,
    producto_id integer NOT NULL,
    cantidad integer NOT NULL,
    precio_unitario numeric(10,2) NOT NULL,
    CONSTRAINT orden_detalle_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.orden_detalle
    OWNER to postgres;

    -- Table: public.orders

-- DROP TABLE IF EXISTS public.orders;

CREATE TABLE IF NOT EXISTS public.orders
(
    id_order integer NOT NULL DEFAULT nextval('orders_id_order_seq'::regclass),
    id_usuario integer NOT NULL,
    total numeric(10,2),
    estado character varying(20) COLLATE pg_catalog."default" DEFAULT 'CREADA'::character varying,
    fecha timestamp without time zone DEFAULT now(),
    CONSTRAINT orders_pkey PRIMARY KEY (id_order)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.orders
    OWNER to postgres;

    -- Table: public.usuarios

-- DROP TABLE IF EXISTS public.usuarios;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id_usuario integer NOT NULL DEFAULT nextval('usuarios_id_usuario_seq'::regclass),
    cedula character varying(10) COLLATE pg_catalog."default",
    nombre character varying(50) COLLATE pg_catalog."default",
    correo character varying(100) COLLATE pg_catalog."default",
    telefono character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;