const QUIZ_TREE = {
  id: "root",
  question: "花梗（花与枝之间的小茎）有多长？",
  options: [
    {
      label: "长花梗（超过3cm，花朵明显悬挂）",
      value: "long_stem",
      next: {
        id: "long_stem_1",
        question: "花朵的姿态是？",
        options: [
          {
            label: "花朵明显下垂，如同低头",
            value: "drooping",
            next: {
              id: "long_stem_drooping",
              question: "花梗的颜色是？",
              options: [
                {
                  label: "细长红丝，鲜艳红色",
                  value: "red_silk",
                  result: 6
                },
                {
                  label: "绿色或黄绿色",
                  value: "green_stem",
                  result: 5
                }
              ]
            }
          },
          {
            label: "花朵水平伸展或微微上扬",
            value: "horizontal",
            result: 5
          }
        ]
      }
    },
    {
      label: "短花梗或几乎无梗（花朵紧贴枝条）",
      value: "short_stem",
      next: {
        id: "short_stem_1",
        question: "花朵开放时，枝条上有叶片吗？",
        options: [
          {
            label: "先花后叶，开花时几乎无叶",
            value: "no_leaf",
            next: {
              id: "no_leaf_1",
              question: "花朵大小与颜色？",
              options: [
                {
                  label: "大型白花或紫花，花被多片，无叶乔木/灌木",
                  value: "large_white",
                  next: {
                    id: "large_white_1",
                    question: "花朵颜色与植株特征？",
                    options: [
                      {
                        label: "纯白，高大乔木，花直立向上，花被9片",
                        value: "tall_white",
                        result: 3
                      },
                      {
                        label: "外紫内白，灌木或小乔木，花被6-9片",
                        value: "purple_white",
                        result: 15
                      },
                    ]
                  }
                },
                {
                  label: "大型紫色花，花被6片，灌木",
                  value: "large_purple",
                  result: 4
                },
                {
                  label: "中小型白花，5瓣，花药有特殊颜色",
                  value: "white_five",
                  next: {
                    id: "white_five_1",
                    question: "花药颜色？",
                    options: [
                      {
                        label: "花药紫红色，乔木，花朵较大",
                        value: "purple_anther",
                        result: 21
                      },
                      {
                        label: "花药黄色，花朵细碎，乔木",
                        value: "yellow_anther",
                        result: 22
                      },
                      {
                        label: "花瓣粉白渐变，红色花萼向后反折",
                        value: "red_sepal",
                        result: 23
                      },
                      {
                        label: "中型粉白花，花瓣5片有缺刻，山桃",
                        value: "pink_notch",
                        result: 9
                      }
                    ]
                  }
                },
                {
                  label: "小型金黄花，四瓣管状",
                  value: "small_yellow",
                  next: {
                    id: "small_yellow_1",
                    question: "花瓣数量与形状？",
                    options: [
                      {
                        label: "四瓣，花瓣狭长",
                        value: "four_petals",
                        result: 10
                      },
                      {
                        label: "六瓣，花瓣细长下垂",
                        value: "six_drooping",
                        result: 1
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            label: "叶花同开，有叶片存在",
            value: "with_leaf",
            next: {
              id: "with_leaf_1",
              question: "花朵颜色？",
              options: [
                {
                  label: "朱红或橙红，花朵密集",
                  value: "orange_red",
                  result: 12
                },
                {
                  label: "紫红小花，直接长在老枝或主干",
                  value: "purple_trunk",
                  result: 13
                },
                {
                  label: "白色，花形似荷花，大型，常绿乔木",
                  value: "white_lotus",
                  result: 14
                },
                {
                  label: "淡黄白色，花朵半开半闭，香气似香蕉",
                  value: "half_open",
                  result: 24
                },
                {
                  label: "粉红重瓣，花瓣多于5片",
                  value: "pink_double",
                  result: 8
                },
                {
                  label: "白色或浅粉，五瓣单瓣，叶片紫色",
                  value: "purple_leaf",
                  result: 11
                }
              ]
            }
          }
        ]
      }
    },
    {
      label: "挺直花茎（草本，花茎直立粗壮）",
      value: "erect_stem",
      next: {
        id: "erect_1",
        question: "植株类型？",
        options: [
          {
            label: "草本植物，茎顶单花，叶为羽状复叶",
            value: "herb_single",
            result: 19
          },
          {
            label: "球根植物，杯形花，叶宽带形",
            value: "bulb_cup",
            result: 16
          },
          {
            label: "木本，花朵大且重瓣，叶为羽状复叶",
            value: "woody_double",
            result: 18
          }
        ]
      }
    },
    {
      label: "小型花朵聚成花序（很多小花簇在一起）",
      value: "cluster",
      next: {
        id: "cluster_1",
        question: "花序形态与花朵特征？",
        options: [
          {
            label: "四瓣小花组成圆锥花序，香气浓郁",
            value: "four_cluster",
            result: 17
          },
          {
            label: "五瓣小花成串，枝条攀援有皮刺",
            value: "climbing_rose",
            result: 20
          }
        ]
      }
    }
  ]
};

function findFlowerById(id) {
  return FLOWERS_DATA.find(f => f.id === id);
}
