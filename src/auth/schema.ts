import Joi from 'joi';
import { Header } from '../core/utils';
import { JoiAuthBearer } from '../helpers/validator';
import apikey from './apikey';


export default {
    apikey: Joi.object()
        .keys({
            [Header.API_KEY]: Joi.string().required()
        })
        .unknown(true),
    auth: Joi.object()
        .keys({
            authorization: JoiAuthBearer().required(),
        })
        .unknown(true),
    
};