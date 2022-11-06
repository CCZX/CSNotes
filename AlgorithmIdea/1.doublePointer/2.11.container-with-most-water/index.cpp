#include <vector>
#include <algorithm>

class Solution {
public:
    int maxArea(std::vector<int>& height) {
      int left = 0;
      int right = height.size() - 1;
      int max = 0;

      while(left < right) {
        if(height[left] < height[right]) {
          left++;
          int area = height[left] * (right - left);
          max = std::max(max, area);
        } else {
          right--;
          int area = height[right] * (right - left);
          max = std::max(max, area);
        }
      }

      return max;
    }
};