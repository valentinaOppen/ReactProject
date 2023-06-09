import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { createProduct, editProduct, validateProductId } from '../store/productSlice';
import { formatDateForInput, formatDatePlusOneYear } from '../helpers/dateFormater';

import '../styles/products-form.css';
import '../styles/buttons.css';

const ProductsForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    let errorsForm = useSelector((state: any) => state.product.error);
    let selectedProduct = useSelector((state: any) => state.product.productSelected?.product);
    let deleteProduct = useSelector((state: any) => state.product.productSelected?.product);

    useEffect(() => {
        setInitialValues();
    }, [])

    const setRevisionDate = (e: any) => {
        setValue('date_revision', formatDatePlusOneYear(e.target.value));
    }

    const setInitialValues = () => {
        if (selectedProduct) {
            setValue('id', selectedProduct.id);
            setValue('name', selectedProduct.name);
            setValue('description', selectedProduct.description);
            setValue('logo', selectedProduct.logo);
            setValue('date_release', formatDateForInput(selectedProduct.date_release));
            setValue('date_revision', formatDateForInput(selectedProduct.date_revision));
        }
    }


    const onSubmit = (data: any) => {
        //@ts-ignore;
        dispatch(validateProductId(data.id));
        if (errorsForm) return;

        if (selectedProduct) {
            //@ts-ignore
            dispatch(editProduct(data));
            navigate('/', { replace: true });
        }
        else {
            //@ts-ignore
            dispatch(createProduct(data));
            navigate('/', { replace: true });
        }
    };

    const handleCancel = () => {
        if (deleteProduct) navigate('/', { replace: true });
    }

    const handleDelete = () => {
        //@ts-ignore
        dispatch(deleteProduct(selectedProduct.id));
        navigate('/', { replace: true });
    }

    return (

        <div className="container-form">
            <h2 className="title-form">{deleteProduct ? 'Eliminar Registro' : 'Formulario de registro'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex" style={{ marginBottom: '20px' }}>
                    <div className="flex column w-90 text-left">
                        <label aria-label="ID" className="label-form">ID</label>
                        <>
                            <input data-testid="ID" className={errors.id ? 'form-error form-input' : 'form-input'} {...register("id")} />
                            {errors.id && <span className="input-error">This field is required</span>}

                        </>
                    </div>
                    <div className="flex column w-90 text-left">
                        <label className="label-form">Nombre</label>
                        <>
                            <input data-testid="Nombre" className={errors.name ? 'form-error form-input' : 'form-input'} {...register("name",
                                {
                                    required: { value: true, message: 'El campo es requerido' },
                                    minLength: { value: 5, message: 'El campo debe tener mas de 5 caracteres' },
                                    maxLength: { value: 100, message: 'El campo debe tener menos de 100 caracteres' }
                                })} />
                            {errors?.name?.message && <span className="input-error">{errors.name.message.toString()}</span>}
                        </>
                    </div>
                </div>
                <div className="flex" style={{ marginBottom: '20px' }}>
                    <div className="flex column w-90 text-left">
                        <label className="label-form">Descripción</label>
                        <>
                            <input data-testid="Descripcion" className={errors.description ? 'form-error form-input' : 'form-input'} {...register("description",
                                {
                                    required: { value: true, message: 'El campo es requerido' },
                                    minLength: { value: 10, message: 'El campo debe tener mas de 10 caracteres' },
                                    maxLength: { value: 200, message: 'El campo debe tener menos de 200 caracteres' }
                                })} />
                            {errors?.description?.message && <span className="input-error">{errors.description.message.toString()}</span>}
                        </>
                    </div>
                    <div className="flex column w-90 text-left">
                        <label className="label-form">Logo</label>
                        <>
                            <input data-testid="Logo" className={errors.logo ? 'form-error form-input' : 'form-input'} {...register("logo", { required: { value: true, message: 'El campo es requerido' } })} />
                            {errors?.logo?.message && <span className="input-error">{errors.logo.message.toString()}</span>}
                        </>
                    </div>
                </div>
                <div className="flex" style={{ marginBottom: '20px' }}>
                    <div className="flex column w-90 text-left">
                        <label className="label-form">Fecha Liberación</label>
                        <>
                            <input data-testid="FechaLiberacion" type="date" min={new Date().toISOString().split("T")[0]} className={errors.date_release ? 'form-error form-input' : 'form-input'} {...register("date_release", { required: true })} onBlur={(e) => setRevisionDate(e)} />
                            {errors.date_release && <span className="input-error">This field is required</span>}
                        </>
                    </div>
                    <div className="flex column w-90 text-left">
                        <label className="label-form">Fecha Revisión</label>
                        <>
                            <input type="date" data-testid="FechaRevision" disabled className={errors.date_revision ? 'form-error form-input' : 'form-input'} {...register("date_revision", { required: true })} />
                            {errors.date_revision && <span className="input-error">This field is required</span>}
                        </>
                    </div>
                </div>
                <div className="errors-form">{errorsForm && <span className="input-error">{errorsForm}</span>}</div>
                <div className="buttons-form">
                    <button type="reset" onClick={handleCancel} className="btn-cancel">Cancelar</button>
                    {deleteProduct ?
                        <button type="button" onClick={handleDelete} className="btn-action">Eliminar</button> :
                        <button type="submit" data-testid="btn-enviar" disabled={errorsForm} className="btn-action">Enviar</button>}
                </div>
            </form>
        </div>
    );
}

export default ProductsForm;
