/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ActivitiTaskList } from './src/components/activiti-tasklist.component';
import { ActivitiTaskDetails } from './src/components/activiti-task-details.component';
import { ActivitiFilters } from './src/components/activiti-filters.component';
import { ActivitiTaskListService } from './src/services/activiti-tasklist.service';
import { FilterModel } from './src/models/filter.model';

export * from './src/components/activiti-tasklist.component';

export const ALFRESCO_TASKLIST_DIRECTIVES: [any] = [ActivitiFilters, ActivitiTaskList, ActivitiTaskDetails];
export const ACTIVITI_TASKLIST_SERVICE: [any] = [ActivitiTaskListService];
export const FILTER_MODEL: [any] = [FilterModel];

