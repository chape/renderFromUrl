Photo Sync Exercise
��һ��
����Ҫʵ��һ��������������������Ƭ���ϴ�ʱ�����Ƭ���з��顣ͬһ
�����ƬӦ�ñ����ֵ�ͬһ�������棬��ͬһ�����ƬӦ�ñ����ֵ���ͬ
�������档����ǩ�����£�
function group(photos) { };
group ���������������������£�
[
{
"id" : "1329fdebd5",
"time" : 1345168843044,
"width" : 823,
"height" : 888,
"imageURL" : "http://photosync.
herokuapp.com/photos/1329fdebd5"
},
{
"id" : "1a55f933e8",
"time" : 1345131939576,
"width" : 1131,
"height" : 1154,
"imageURL" : "http://photosync.
herokuapp.com/photos/1a55f933e8"
},
{
"id" : "146be11fbf",
"time" : 1345130185274,
"width" : 877,
"height" : 926,
"imageURL" : "http://photosync.
herokuapp.com/photos/146be11fbf"
}
]
ÿһ����Ƭ�� time ���Զ���һ����ʾ����ʱ�������������ֱ��ͨ��
new Date(time) ��ȡ����Ӧ��ʱ�䡣���� 1345168843044 ��Ӧ
"new Date("Fri Aug 17 2012 10:00:43 GMT+0800 (CST)") ��
���鱣֤�Ѿ��� time ���Խ��е�����������һ��� time ���Զ�����
�ܱ���֮ǰ����� time ������ֵҪ��
group ��������������������£�
{
"2012-08-17" : [
{
"id" : "1329fdebd5",
"time" : 1345168843044,
"width" : 823,
"height" : 888,
"imageURL" : "http://photosync.
herokuapp.com/photos/1329fdebd5"
}
],
"2012-08-16" : [
{
"id" : "1a55f933e8",
"time" : 1345131939576,
"width" : 1131,
"height" : 1154,
"imageURL" : "http://photosync.
herokuapp.com/photos/1a55f933e8"
},
{
"id" : "146be11fbf",
"time" : 1345130185274,
"width" : 877,
"height" : 926,
"imageURL" : "http://photosync.
herokuapp.com/photos/146be11fbf"
}
]
}
�����ÿһ����һ�����������飬���ļ�ֵ����һ�����ڵ�
"YYYY-MM-DD" ��ʽ�ַ���������˵ 1345168843044 ��Ӧ�����ڸ�ʽ��
������ "2012-08-17" ��
�ڷ����ʱ�򣬿��Բ�����ʱ������ʹ�ÿͻ��� JavaScript ���������õ�
ʱ����
�ڶ���
�� http://photo-sync.herokuapp.com/photos ��ȡ��Ƭ���ݣ����õ�һ���ĺ�
���� JSON �е� photos ������а����ڷ��飬Ȼ�������µķ�ʽ��ʾ
������
��Ƭ�� width �� height ���Դ������Ŀ�Ⱥ͸߶ȡ�����ʾʱ��Ҫ����
Ƭ������ 160px * 160px ���ڣ�ͬʱ����ԭ�п�߱ȡ�һ�������ʾ 5 ��
��Ƭ��
���������ӷ��
�� http://photo-sync.herokuapp.com/photos ��ȡ���������У���һ��
nextURL ���Ա�ʾ��һҳ�����ݵ�ַ����һҳ�����ݽṹ����һ���ģ���
����һҳ��һ����Ƭ�� time ���Բ�����һҳ���һ����Ƭ�� time ����
��ֵ��
�������ݿ�����������ҳ���뽫�ڶ�����ɵ�ҳ��Ľ�Ϊ�ܹ���������
������