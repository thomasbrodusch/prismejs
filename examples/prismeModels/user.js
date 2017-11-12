// Your PrismeJS formatted output for an user.
// use this grammar:
// data.toto >>> data['toto']
// data.toto:tata >>> get data['toto'] if  data['toto'] = 'tata'
// data.toto[tata] >>> data['toto'].value

export default {
    id: 'id',
    name: 'data.modelDataId:user_name[value]',
    type: 'data.modelDataId:user_type[value]',
    status: 'data.modelDataId:user_status[value]',
    currentProject: {
        id: 'data.modelDataId:user_current_project_id[value]',
        deadline: 'data.modelDataId:user_current_project_deadline[value]'
    }
};
