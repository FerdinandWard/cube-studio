import ajax from './ajax';
import { IPipelineAdd, IPipelineEdit } from '../types/pipeline';
import { ITaskAdd, ITaskEdit } from '../types/task';

// 获取任务模板列表
const job_template_modelview = (): Promise<any> => {
  return ajax.get('/job_template_modelview/api/');
};

// 获取项目组
const project_modelview = (): Promise<any> => {
  return ajax.get('/project_modelview/api/');
};

// 新增流水线

const pipeline_modelview_add = (data: IPipelineAdd): Promise<any> => {
  return ajax.post({ url: '/pipeline_modelview/api/', data });
};

// 获取流水线信息
const pipeline_modelview_detail = (pipelineId: number | string): Promise<any> => {
  return ajax.get(`/pipeline_modelview/api/${pipelineId}`);
};

// 流水线编辑提交
const pipeline_modelview_edit = (pipelineId: number | string, data: IPipelineEdit): Promise<any> => {
  return ajax.put({
    url: `/pipeline_modelview/api/${pipelineId}`,
    data,
  });
};

// 运行流水线
const pipeline_modelview_run = (pipelineId: number | string): Promise<any> => {
  return ajax.post({
    url: `/pipeline_modelview/api/run_pipeline/${pipelineId}`,
  });
};

// 克隆流水线
const pipeline_modelview_copy = (pipelineId: number | string): Promise<any> => {
  return ajax.post({
    url: `/pipeline_modelview/api/copy_pipeline/${pipelineId}`,
  });
};

// 往流水线中添加task
const task_modelview_add = (pipelineId: number | string, data: ITaskAdd): Promise<any> => {
  return ajax.post({
    url: '/task_modelview/api/',
    data: {
      ...data,
      filters: [
        {
          col: 'pipeline',
          opr: 'rel_o_m',
          value: +pipelineId,
        },
      ],
    },
  });
};

// 获取流水线中相应的task
const task_modelview_get = (taskId: string | number): Promise<any> => {
  return ajax.get(`/task_modelview/api/${taskId}`);
};

// 删除对应的 task
const task_modelview_del = (taskId: string | number): Promise<any> => {
  return ajax.delete(`/task_modelview/api/${taskId}`);
};

// 编辑 task
const task_modelview_edit = (pipelineId: string | number, taskId: string | number, data: ITaskEdit): Promise<any> => {
  return ajax.put({
    url: `/task_modelview/api/${taskId}`,
    data: {
      ...data,
      filters: [
        {
          col: 'pipeline',
          opr: 'rel_o_m',
          value: +pipelineId,
        },
      ],
    },
  });
};

const api = {
  job_template_modelview,
  project_modelview,
  pipeline_modelview_add,
  pipeline_modelview_detail,
  pipeline_modelview_edit,
  pipeline_modelview_run,
  pipeline_modelview_copy,
  task_modelview_add,
  task_modelview_get,
  task_modelview_del,
  task_modelview_edit,
};

export default api;
