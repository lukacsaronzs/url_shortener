import { Request, Response, NextFunction } from 'express';

export interface PagerQueryParams {
    start?: string;
    length?: string;
    column?: string;
    order?: string;
    search?: string;
    summary?: string;
    ids?: string;
}

export function parseQueryParams(req: Request<{}, {}, {}, PagerQueryParams>,
                                 res: Response, next: NextFunction) {
    const { start, length, column, order, search, summary, ids } = req.query;

    req.filter = {
        pageOffset: 0,
        pageLength: 50,
    };

    if (search && typeof search === 'string') {
        req.filter.search = decodeURIComponent(search.trim().toLowerCase());
    }

    if ((column && typeof column === 'string') && (order && typeof order === 'string')) {
        const direction = parseInt(order, 10);
        if (direction === 1 || direction === -1) {
            req.filter.sort = { field: column, direction };
        }
    }

    if (start && typeof start === 'string') {
        req.filter.pageOffset = parseInt(start, 10) || 0;
    }

    if (length && typeof length === 'string') {
        req.filter.pageLength = parseInt(length, 10) || 50;
    }

    if (summary && typeof summary === 'string') {
        const s: { [key: string]: 0 | 1 } = {};
        summary.split(',').forEach((prop: string) => s[prop] = 1);
        req.filter.summary = s;
    }

    if (ids && typeof ids === 'string') {
        req.filter.ids = ids.split(',');
    }

    next();
}
