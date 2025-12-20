from rest_framework.pagination import CursorPagination

class InfiniteScrollPagination(CursorPagination):
    page_size = 10
    ordering = "-id"
